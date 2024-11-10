import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { code } = await req.json(); // Parse JSON body

    console.log('Received code:', code); // Log the code received from the request

    const parserUrl = "http://127.0.0.1:5000/parse_string";

    // Call the parser API to get the JSON output
    const response = await fetch(parserUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code_string: code }), // Send code as "code_string" to match Python endpoint
    });

    const text = await response.text(); // Log the response from the parser
    return NextResponse.json(text);
    
  } catch (error) {
    console.error('Error fetching parsed data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
