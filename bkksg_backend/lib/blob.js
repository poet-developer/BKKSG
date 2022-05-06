module.exports = {
     send : file =>{
          axios.post('/admin/axios_process', {file})
          .then('Suceess')
          .catch(console.log);
     },
}