export function storeToClipBoard(info) {
    if (navigator.clipboard && window.isSecureContext) {
        console.log("navigator", info);
      navigator.clipboard.writeText(info);
    } else {
        console.log("else");
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement("textarea");
      textArea.value = info;
  
      // Move textarea out of the viewport so it's not visible
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
  
      document.body.prepend(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (error) {
        console.error(error);
      } finally {
        textArea.remove();
      }
    }
  }