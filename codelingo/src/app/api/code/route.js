const { Query } = require('../db'); // Correct import for the query function
import { NextResponse } from 'next/server';

export async function GET(req) {
    console.log('Request:', req);
  try {
    // Query to fetch topics and sections
    const sql = `
      SELECT topic, section, content, code
      FROM cpp_data;
    `;
    
    const { rows } = await Query(sql);
    console.log('Database query result:', rows);

    // Process the data to group sections under each topic
    const topics = rows.reduce((acc, row) => {
      if (!acc[row.topic]) {
        acc[row.topic] = []; // Initialize an array for each topic
      }
      acc[row.topic].push(row.section); // Push each section to its respective topic array
      acc[row.topic].push(row.content); // Push each content to its respective topic array
      acc[row.topic].push(row.code); // Push each code to its respective topic array
      
      return acc;
    }, {});

    // Return the JSON response
    return NextResponse.json(topics);

  } catch (error) {
    console.error('Error fetching topics and sections:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
