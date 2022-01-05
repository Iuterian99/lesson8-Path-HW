// ! javascript is synchronic language
// ! node.js is asynchronic language
// const os = require("os");
// console.log(os.version());
// console.log(os.totalmem() / 1024);

// ! fs metodlari!
/*
! JSON.stringify 
---->Jsonni string qilib yozib qo`yadi aks holda shunchaki obyekt deb o`ylidi biz yozgan ma`lumotlarni!

!JSON.parse()
-------> Stringlani olib tashab yana JSON formatga ko`chirib beradi!

! "fs" (FILE SYSTEM)
--> "FS" bu file system ya`ni fayllar bilan ishlashga(yangi fayllar yaratishda, ularni saqlaashda) ishlatiladi! 

!fs.appendFile()
fs.appendFile("./data/data.js") ----> oldindan yaratilgan data folderiga data.js file ni yaratib ichiga content joylab beradi. har yangi ma`lumot jo`natganimizada data.js da mavjud contentni o`chirmay davomidan qo`shib qo`yadi!

!fs.writeFile()
fs.writeFile("./data/data.js")----> oldindan yaratilgan data folderiga data.js file ni yaratib ichiga content joylab beradi. har yangi ma`lumot jo`natganimizada data.js da mavjud contentni o`chirib yangi ma`lumotni qo`shib qo`yadi! Lekin fs.writeFile() dan oldin fs.readFile() qilib o`qilishi kerak bo`lgan fayl kontenti o`qib olsak keyin fs.writeFile() qiganimizda ham data.js da mavjud contentni o`chirmay davomidan qo`shib qo`yadi!

!fs.open()
fs.open("./data/salom.js", "w", (err) => {}) ----> bu data folderiga shunchaki yangi salom.js faylini yaratib beradi lekin ichiga hich narsa yozmidi! "w"-> yozishimiza shart va bu asychronny ishlatishimiz uchun kerak!
*/
//! POST & PUT METHODS
const http = require("http");
const fs = require("fs");
const path = require("path");

//!path.resolve()
// path.resolve(__dirname, "./data/data.js") ==>  mavjud bo`lgan data folderi ichidagi data.js faylini directoriyasini topib olish uchun ishlatiladi

//! path.join()
// path.join(__dirname, "data/data.js") ==> yangittan yatatvotgan data folder ichiga data.js faylni directoriyasini topib beradi!

const server = http.createServer((req, res) => {
  if (req.method == "POST") {
    if (req.url.substring(1) == "newUser") {
      req.on("data", (data) => {
        let user = JSON.parse(data);

        fs.readFile("./data/data.js", (err, data) => {
          //! Arrow function () =>{} ishlatishimizadan maqsad bu arrow function bu registratsiya o`ziga kegan "err", "data" ni qabul qivolib va ularni o`z o`rnida ishlatadi!
          const arr = JSON.parse(data);
          arr.push(user);

          fs.writeFile("./data/data.js", JSON.stringify(arr), (err) => {
            if (err) throw err; //!note: "Throw" runtime(ishlab turgan) paytda xatolik bo`sa chiqarib beradi sistemani to`xtatib qo`ymidi run-time error "type-error" qilib chiqarib beradi
            console.log("created");
          });
        });
      });
      res.end("data keldi");
    }
  }

  // fs.open("./data/salom.js", "w", (err) => {
  //   if (err) throw err;
  //   console.log("salom.js file ochildi!");
  // });

  if (req.method == "PUT") {
    if (req.url.substring(1, 11) == "updateUser") {
      const userID = req.url.split("/")[req.url.split("/").length - 1];
      console.log(userID);

      for await(let user of req){
        fs.readFile("./data/data.json", (err, data) => {
          const parsed = JSON.parse(user);

          let array = JSON.parse(data);

          let oldUser = array.filter(e => e.id == userID ? e.name = parsed.name : e);

          fs.writeFile("./data/data.js", JSON.stringify(oldUser), (err) =>{
            if(err) throw err;
            console.log("updated");
            
          })
        })


      }
      res.end("ok");
    }
  }
});

server.listen(9000, console.log(9000));
