const { Query } = require('../db');
import { NextResponse } from 'next/server';

export async function GET(req) {
  // console.log('Request:', req);
  try {
    // Query to fetch topics and sections
    const sql = `
      SELECT topic, section
      FROM cpp_training
      WHERE level = 1;
    `;
    
    const { rows } = await Query(sql);

    // Process the data to group sections under each topic
    const topics = rows.reduce((acc, row) => {
      if (!acc[row.topic]) {
        acc[row.topic] = []; // Initialize an array for each topic
      }
      acc[row.topic].push({
        section: row.section
      }); // Group section, content, and code under each topic
      
      return acc;
    }, {});

    // Return the JSON response
    return NextResponse.json(topics);

  } catch (error) {
    console.error('Error fetching topics and sections:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST route to retrieve data based on a specific section
export async function POST(req) {
  try {
    // Parse the request body to get the section name
    console.log('Request:', req);
    const { section, level } = await req.json();
    if (!section || !level) {
      return NextResponse.json({ error: 'Section and level parameter is required' }, { status: 400 });
    }

    // SQL query to fetch content and code based on the section
    const sql = `
      SELECT section, question, code, answer, points
      FROM cpp_training
      WHERE section = '${section}' AND level = ${level};
    `;

    // Execute the query with the section parameter
    const { rows } = await Query(sql);

    // Check if any rows are returned
    if (rows.length === 0) {
      return NextResponse.json({ error: 'No data found for the specified section' }, { status: 404 });
    }

    // Return the JSON response with the data
    return NextResponse.json(rows[0]);

  } catch (error) {
    console.error('Error fetching data for section:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
