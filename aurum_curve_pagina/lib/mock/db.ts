const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function createOrder(input: any) {
  try {
    // El frontend le hace un "POST" (una petición para guardar) al backend
    const response = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error("Error al conectar con el servidor");
    }

    return await response.json(); // Devuelve la respuesta del backend
  } catch (error) {
    console.error("Fallo la conexión:", error);
    return { ok: false, error: "No se pudo conectar con la base de datos" };
  }
}
