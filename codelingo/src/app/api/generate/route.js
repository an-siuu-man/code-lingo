export async function POST(req,res) {
  try {
    const parser="https://localhost:5000/parse_string"; // Correct parser API endpoint
    const code = req.body.code;

    // Call the parser API to get the json output
    const response = await fetch(parser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    return NextResponse.json(response.json());

  } catch (error) {
    console.error('Error fetching topics and sections:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
