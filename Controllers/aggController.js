const aggdb = require("../model/aggregation")
const customerdb = require("../model/customer")
const add = ((req,res)=>{
    return new Promise((resolve,reject)=>{
        aggdb.insertMany([{
            
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
              },
              {
                "userId": 1,
                "id": 2,
                "title": "qui est esse",
                "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
              },
              {
                "userId": 1,
                "id": 3,
                "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
                "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
              },
              {
                "userId": 1,
                "id": 4,
                "title": "eum et est occaecati",
                "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
              },
              {
                "userId": 1,
                "id": 5,
                "title": "nesciunt quas odio",
                "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
              },
            
              {
                "userId": 2,
                "id": 11,
                "title": "et ea vero quia laudantium autem",
                "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi"
              },
              {
                "userId": 2,
                "id": 12,
                "title": "in quibusdam tempore odit est dolorem",
                "body": "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio"
              },
              {
                "userId": 2,
                "id": 13,
                "title": "dolorum ut in voluptas mollitia et saepe quo animi",
                "body": "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam"
              },
              {
                "userId": 2,
                "id": 14,
                "title": "voluptatem eligendi optio",
                "body": "fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum"
              },
              {
                "userId": 2,
                "id": 15,
                "title": "eveniet quod temporibus",
                "body": "reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae"
              },
              {
                "userId": 2,
                "id": 16,
                "title": "sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio",
                "body": "suscipit nam nisi quo aperiam aut\nasperiores eos fugit maiores voluptatibus quia\nvoluptatem quis ullam qui in alias quia est\nconsequatur magni mollitia accusamus ea nisi voluptate dicta"
              },
              
              {
                "userId": 3,
                "id": 21,
                "title": "asperiores ea ipsam voluptatibus modi minima quia sint",
                "body": "repellat aliquid praesentium dolorem quo\nsed totam minus non itaque\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\ntempora et tenetur expedita sunt"
              },
              {
                "userId": 3,
                "id": 22,
                "title": "dolor sint quo a velit explicabo quia nam",
                "body": "eos qui et ipsum ipsam suscipit aut\nsed omnis non odio\nexpedita earum mollitia molestiae aut atque rem suscipit\nnam impedit esse"
              },
              {
                "userId": 3,
                "id": 23,
                "title": "maxime id vitae nihil numquam",
                "body": "veritatis unde neque eligendi\nquae quod architecto quo neque vitae\nest illo sit tempora doloremque fugit quod\net et vel beatae sequi ullam sed tenetur perspiciatis"
              },
              {
                "userId": 3,
                "id": 24,
                "title": "autem hic labore sunt dolores incidunt",
                "body": "enim et ex nulla\nomnis voluptas quia qui\nvoluptatem consequatur numquam aliquam sunt\ntotam recusandae id dignissimos aut sed asperiores deserunt"
              },
              {
                "userId": 3,
                "id": 25,
                "title": "rem alias distinctio quo quis",
                "body": "ullam consequatur ut\nomnis quis sit vel consequuntur\nipsa eligendi ipsum molestiae et omnis error nostrum\nmolestiae illo tempore quia et distinctio"
              },
             
              {
                "userId": 4,
                "id": 31,
                "title": "ullam ut quidem id aut vel consequuntur",
                "body": "debitis eius sed quibusdam non quis consectetur vitae\nimpedit ut qui consequatur sed aut in\nquidem sit nostrum et maiores adipisci atque\nquaerat voluptatem adipisci repudiandae"
              },
             
              {
                "userId": 4,
                "id": 37,
                "title": "provident vel ut sit ratione est",
                "body": "debitis et eaque non officia sed nesciunt pariatur vel\nvoluptatem iste vero et ea\nnumquam aut expedita ipsum nulla in\nvoluptates omnis consequatur aut enim officiis in quam qui"
              },
              {
                "userId": 4,
                "id": 38,
                "title": "explicabo et eos deleniti nostrum ab id repellendus",
                "body": "animi esse sit aut sit nesciunt assumenda eum voluptas\nquia voluptatibus provident quia necessitatibus ea\nrerum repudiandae quia voluptatem delectus fugit aut id quia\nratione optio eos iusto veniam iure"
              },
              {
                "userId": 4,
                "id": 39,
                "title": "eos dolorem iste accusantium est eaque quam",
                "body": "corporis rerum ducimus vel eum accusantium\nmaxime aspernatur a porro possimus iste omnis\nest in deleniti asperiores fuga aut\nvoluptas sapiente vel dolore minus voluptatem incidunt ex"
              },
              {
                "userId": 4,
                "id": 40,
                "title": "enim quo cumque",
                "body": "ut voluptatum aliquid illo tenetur nemo sequi quo facilis\nipsum rem optio mollitia quas\nvoluptatem eum voluptas qui\nunde omnis voluptatem iure quasi maxime voluptas nam"
              },
            
              {
                "userId": 5,
                "id": 44,
                "title": "optio dolor molestias sit",
                "body": "temporibus est consectetur dolore\net libero debitis vel velit laboriosam quia\nipsum quibusdam qui itaque fuga rem aut\nea et iure quam sed maxime ut distinctio quae"
              },
              {
                "userId": 5,
                "id": 45,
                "title": "ut numquam possimus omnis eius suscipit laudantium iure",
                "body": "est natus reiciendis nihil possimus aut provident\nex et dolor\nrepellat pariatur est\nnobis rerum repellendus dolorem autem"
              },
              {
                "userId": 5,
                "id": 46,
                "title": "aut quo modi neque nostrum ducimus",
                "body": "voluptatem quisquam iste\nvoluptatibus natus officiis facilis dolorem\nquis quas ipsam\nvel et voluptatum in aliquid"
              },
              {
                "userId": 5,
                "id": 47,
                "title": "quibusdam cumque rem aut deserunt",
                "body": "voluptatem assumenda ut qui ut cupiditate aut impedit veniam\noccaecati nemo illum voluptatem laudantium\nmolestiae beatae rerum ea iure soluta nostrum\neligendi et voluptate"
              },
              {
                "userId": 5,
                "id": 48,
                "title": "ut voluptatem illum ea doloribus itaque eos",
                "body": "voluptates quo voluptatem facilis iure occaecati\nvel assumenda rerum officia et\nillum perspiciatis ab deleniti\nlaudantium repellat ad ut et autem reprehenderit"
              },
              {
                "userId": 5,
                "id": 49,
                "title": "laborum non sunt aut ut assumenda perspiciatis voluptas",
                "body": "inventore ab sint\nnatus fugit id nulla sequi architecto nihil quaerat\neos tenetur in in eum veritatis non\nquibusdam officiis aspernatur cumque aut commodi aut"
              },
              {
                "userId": 5,
                "id": 50,
                "title": "repellendus qui recusandae incidunt voluptates tenetur qui omnis exercitationem",
                "body": "error suscipit maxime adipisci consequuntur recusandae\nvoluptas eligendi et est et voluptates\nquia distinctio ab amet quaerat molestiae et vitae\nadipisci impedit sequi nesciunt quis consectetur"
              },
             
              {
                "userId": 6,
                "id": 57,
                "title": "sed ab est est",
                "body": "at pariatur consequuntur earum quidem\nquo est laudantium soluta voluptatem\nqui ullam et est\net cum voluptas voluptatum repellat est"
              },
              {
                "userId": 6,
                "id": 58,
                "title": "voluptatum itaque dolores nisi et quasi",
                "body": "veniam voluptatum quae adipisci id\net id quia eos ad et dolorem\naliquam quo nisi sunt eos impedit error\nad similique veniam"
              },
              {
                "userId": 6,
                "id": 59,
                "title": "qui commodi dolor at maiores et quis id accusantium",
                "body": "perspiciatis et quam ea autem temporibus non voluptatibus qui\nbeatae a earum officia nesciunt dolores suscipit voluptas et\nanimi doloribus cum rerum quas et magni\net hic ut ut commodi expedita sunt"
              },
              {
                "userId": 6,
                "id": 60,
                "title": "consequatur placeat omnis quisquam quia reprehenderit fugit veritatis facere",
                "body": "asperiores sunt ab assumenda cumque modi velit\nqui esse omnis\nvoluptate et fuga perferendis voluptas\nillo ratione amet aut et omnis"
              },
             
              {
                "userId": 7,
                "id": 67,
                "title": "aliquid eos sed fuga est maxime repellendus",
                "body": "reprehenderit id nostrum\nvoluptas doloremque pariatur sint et accusantium quia quod aspernatur\net fugiat amet\nnon sapiente et consequatur necessitatibus molestiae"
              },
              {
                "userId": 7,
                "id": 68,
                "title": "odio quis facere architecto reiciendis optio",
                "body": "magnam molestiae perferendis quisquam\nqui cum reiciendis\nquaerat animi amet hic inventore\nea quia deleniti quidem saepe porro velit"
              },
              {
                "userId": 7,
                "id": 69,
                "title": "fugiat quod pariatur odit minima",
                "body": "officiis error culpa consequatur modi asperiores et\ndolorum assumenda voluptas et vel qui aut vel rerum\nvoluptatum quisquam perspiciatis quia rerum consequatur totam quas\nsequi commodi repudiandae asperiores et saepe a"
              },
              {
                "userId": 7,
                "id": 70,
                "title": "voluptatem laborum magni",
                "body": "sunt repellendus quae\nest asperiores aut deleniti esse accusamus repellendus quia aut\nquia dolorem unde\neum tempora esse dolore"
              },
             
              {
                "userId": 8,
                "id": 79,
                "title": "pariatur consequatur quia magnam autem omnis non amet",
                "body": "libero accusantium et et facere incidunt sit dolorem\nnon excepturi qui quia sed laudantium\nquisquam molestiae ducimus est\nofficiis esse molestiae iste et quos"
              },
              {
                "userId": 8,
                "id": 80,
                "title": "labore in ex et explicabo corporis aut quas",
                "body": "ex quod dolorem ea eum iure qui provident amet\nquia qui facere excepturi et repudiandae\nasperiores molestias provident\nminus incidunt vero fugit rerum sint sunt excepturi provident"
              },
              {
                "userId": 9,
                "id": 81,
                "title": "tempora rem veritatis voluptas quo dolores vero",
                "body": "facere qui nesciunt est voluptatum voluptatem nisi\nsequi eligendi necessitatibus ea at rerum itaque\nharum non ratione velit laboriosam quis consequuntur\nex officiis minima doloremque voluptas ut aut"
              },
             
              {
                "userId": 9,
                "id": 90,
                "title": "ad iusto omnis odit dolor voluptatibus",
                "body": "minus omnis soluta quia\nqui sed adipisci voluptates illum ipsam voluptatem\neligendi officia ut in\neos soluta similique molestias praesentium blanditiis"
              },
            
              {
                "userId": 10,
                "id": 95,
                "title": "id minus libero illum nam ad officiis",
                "body": "earum voluptatem facere provident blanditiis velit laboriosam\npariatur accusamus odio saepe\ncumque dolor qui a dicta ab doloribus consequatur omnis\ncorporis cupiditate eaque assumenda ad nesciunt"
              },
              {
                "userId": 10,
                "id": 96,
                "title": "quaerat velit veniam amet cupiditate aut numquam ut sequi",
                "body": "in non odio excepturi sint eum\nlabore voluptates vitae quia qui et\ninventore itaque rerum\nveniam non exercitationem delectus aut"
              },
              {
                "userId": 10,
                "id": 97,
                "title": "quas fugiat ut perspiciatis vero provident",
                "body": "eum non blanditiis soluta porro quibusdam voluptas\nvel voluptatem qui placeat dolores qui velit aut\nvel inventore aut cumque culpa explicabo aliquid at\nperspiciatis est et voluptatem dignissimos dolor itaque sit nam"
              },
              {
                "userId": 10,
                "id": 98,
                "title": "laboriosam dolor voluptates",
                "body": "doloremque ex facilis sit sint culpa\nsoluta assumenda eligendi non ut eius\nsequi ducimus vel quasi\nveritatis est dolores"
              },
              {
                "userId": 10,
                "id": 99,
                "title": "temporibus sit alias delectus eligendi possimus magni",
                "body": "quo deleniti praesentium dicta non quod\naut est molestias\nmolestias et officia quis nihil\nitaque dolorem quia"
              },
              {
                "userId": 10,
                "id": 100,
                "title": "at nam consequatur ea labore ea harum",
                "body": "cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut"
              }
            ]).then((result)=>{
            return resolve({success:true,message:"Added the data",data:result})
        }).catch(err=>{
            return reject({error:true,message:"error while adding the data",err:err})
        })        
    })
})

const match = ((req,res)=>{
    return new Promise((resolve,reject)=>{
        aggdb.aggregate([{
            "$match":{$and:[{"userId":10},{"points":50}]},
        }]).then((result)=>{
            return resolve({success:true,message:"done",data:result})
        }).catch(err=>{
            return reject(err)
        })
    })
})
const project = ((req,res)=>{
  return new Promise((resolve,reject)=>{
    aggdb.aggregate([{
      $project:{"id":1,"userId":1,"_id":0,"description":"$body"}
    }]).then((result)=>{
      return resolve({success:true,data:result})
    }).catch(err=>{
      return reject({error:true,message:"error"})
    })
  })
})
const group = ((req,res)=>{
  return new Promise((resolve,reject)=>{
    aggdb.aggregate([{
      $group:{_id:"$marks",Allmarks:{$sum:1},minmarks:{$min:"$marks"},maxmarks:{$max:"$marks"},avgmarks:{$avg:"$marks"}}
    }]).then((result)=>{
      return resolve({success:true,data:result})
    }).catch(err=>{
      return reject({error:err})
    })
  })
})
const unwind =((req,res)=>{
  return new Promise((resolve,reject)=>{
    aggdb.aggregate([{
      $unwind:"$marks"
    },{$group:{_id:"$title",count:{$sum:1},marks:{$push:"$marks"}}}]).then((result)=>{
      return resolve({success:true,data:result})
    }).catch(err=>{
      return reject({error:err})
    })
  })
})
const lookup =((req,res)=>{
  return new Promise((resolve,reject)=>{
    customerdb.aggregate([{
      $lookup:{
        from:"aggregations",
        localField:"userid",
        foreignField:"userId",
        as:"user"
      }
     },{
      $lookup:{
        from:'users',
        localField:"firstname",
        foreignField:"Firstname",
        as:"userdata"
      }},
    {$project:{"firstname":1,"city":1,"userid":1,"user.userId":1,"user.title":1,"userdata.Firstname":1,"userdata.Email":1,"userdata.messages.message":1,"userdata.posts.userId":1}}]).then((result)=>{
      return resolve({success:true,data:result})
    }).catch(err=>{
      return reject({error:err})
    })
  })
})
const update = ((req,res)=>{
    return new Promise((resolve,reject)=>{
       aggdb.updateMany({"userId":10},{$set:{"bonus":"awarded","marks":[33,55,63,35]}}).then((result)=>{
           return resolve({success:true,data:result})
       }).catch(err=>{
           return reject({err:err}) 
       })
    })
})
const find = ((req,res)=>{
  return new Promise((resolve,reject)=>{
     aggdb.find().then((result)=>{
         return resolve({success:true,data:result})
     }).catch(err=>{
         return reject({err:err}) 
     })
  })
})
module.exports = {add,match,update,project,group,find,unwind,lookup}