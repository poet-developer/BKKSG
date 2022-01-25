module.exports = {

  // 작가 이름 선택 옵션
  profileOpt: function (profiles) {
    let options;
    for (var i = 0; i < profiles.length; i++) {
      options =
        options + `<option class= 'optionList' value=${profiles[i].nickname}>`;
      options = options + profiles[i].nickname;
      options = options + "</option>";
    }
    return options;
  },


  // 게시물 CRUD는 따로 묶어서 객체화 했음.
  CRUD: {
    create: function (profiles, types) {
      let options;
      let list;
      // 작가 이름
      for (var i = 0; i < profiles.length; i++) {
        options = options + `<option value=${profiles[i].id}>`;
        options = options + profiles[i].nickname;
        options = options + "</option>";
      }

      //글 장르

      for (var i = 0; i < types.length; i++) {
        list = list + `<option value=${types[i].id}>`;
        list = list + types[i].topic;
        list = list + "</option>";
      }
      // POST 향식의 펼치기 방식 포맷
      return `
               <form method = "POST" action = "/admin/create_process" enctype="multipart/form-data">
                    Title :<input type="text" name="title"
                    placeholder="title" required><br> Author : 
                    <select name = 'author'>
                         <option value=''> SELECT </option> 
                         ${options}
                    </select><br>
                    Type :  <select name = 'type'>
                    <option value=''> SELECT </option> 
                    ${list}
                    </select><br>
                    <p>
                    Contents<br>
                    <input type="file" accept="image/jpg,image/jpeg,image/png" name ="avatar"  multiple required><br>
                    <textarea name="desc" id="" cols="30" rows="10"></textarea></p>
                    <input type="submit" value="만들기">
               </form>`;
    },
  },
};
