export const chunkFile = (file) => {
  if (!file || !file.data) {
    console.log("❌ Invalid file format");
    return [];
  }

  const buffer = Buffer.from(file.data); // 🔥 FIX
  const chunkSize = 1024;

  const chunks = [];

  for (let i = 0; i < buffer.length; i += chunkSize) {
    const slice = buffer.slice(i, i + chunkSize);

    chunks.push({
      id: chunks.length,
      data: Array.from(slice),
    });
  }

  return chunks;
};