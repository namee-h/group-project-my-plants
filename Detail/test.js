const uploadBtn = document.getElementById('uploadBtn');
 
uploadBtn.addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files;
  const formData = new FormData();
  formData.append('file', file);
 
  const response = axios.post('/asset/detail', formData, {
   headers: {
      'Content-Type': 'multipart/form-data',
   },
   data: formData
  });
}
);