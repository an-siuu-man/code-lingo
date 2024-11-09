import db from '../db';

export default async function handler(req, res) {
  try {
    const topicsQuery = `
      SELECT DISTINCT ON (topics.id) 
        topics.id, topics.name AS topic_name, topics.number AS topic_number, 
        sections.name AS section_name, sections.number AS section_number, sections.id AS section_id
      FROM topics
      LEFT JOIN sections ON sections.topic_id = topics.id
      ORDER BY topics.id, sections.number
    `;
    const { rows } = await db.query(topicsQuery);

    const topics = rows.reduce((acc, row) => {
      let topic = acc.find(t => t.id === row.id);
      if (!topic) {
        topic = {
          id: row.id,
          name: row.topic_name,
        //   number: row.topic_number,
          slug: row.topic_name.toLowerCase().replace(/ /g, '-'),
          sections: []
        };
        acc.push(topic);
      }
      if (row.section_id) {
        topic.sections.push({
          id: row.section_id,
          name: row.section_name,
        //   number: row.section_number,
          slug: row.section_name.toLowerCase().replace(/ /g, '-')
        });
      }
      return acc;
    }, []);

    res.status(200).json(topics);
  } catch (error) {
    console.error('Error fetching topics and sections:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
