export async function get({ params }) {
    const { id } = params;
  
    return new Response(JSON.stringify({welcome:id}), 
    {
      status: 200
    });
}
