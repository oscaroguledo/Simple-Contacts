const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);  // This will be the base64 string
      reader.onerror = reject;
      reader.readAsDataURL(file);  // This converts the file to base64
    });
  };
const base64ToFile = (base64String, fileName) => {
    const [header, base64Data] = base64String.split(',');
    const mimeMatch = header.match(/:(.*?);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  
    const byteCharacters = atob(base64Data);  // Decode base64 to bytes
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = Array.from(slice).map((char) => char.charCodeAt(0));
      byteArrays.push(new Uint8Array(byteNumbers));
    }
  
    const blob = new Blob(byteArrays, { type: mimeType });
    return new File([blob], fileName, { type: mimeType });
  };
    
export {fileToBase64, base64ToFile};