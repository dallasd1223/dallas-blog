
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    
    if (!name) {
        return Response.json({
            message: "Name is required",
        }, { status: 400 });
    }
    
    return Response.json({
        message: "Book added successfully",
        name: name,
    });
}