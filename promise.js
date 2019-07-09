//ASync and await

async function  displayCommits(){
    try{
        const user   =  await  getUser(1);
        const repo   =  await  getReposiotry(user.getusername);
        const commit =  await  getCommits(repo[0]);
        
        console.log(commit);
    }catch(err){
         console.log(err.message); 
    }
    
}

function getUser(id){
   console.log("User Id",id);
   return id;
};

function getRepository(username){
   console.log("Repository",username);
   return username;
};

function getCommits(repo){
    console.log("Commit",repo);
    return repo;
 };
 
//----------------
// const p1 = new Promise((resolve)=>{
//     setTimeout(()=>{
//           console.log("ASync operation-1")
//           resolve(1);   
//     },2000)
// });

// const p2 = new Promise((resolve)=>{
//     setTimeout(()=>{
//           console.log("ASync operation-2")
//           resolve(2);   
//     },2000)
// });

//Run All promise run at the same time.
// Promise.all([p1,p2])
//    .then(result=>console.log(result))
//    .catch(err => console.log("Error", err.message));

// When one promise completed then then other will work
// Promise.race([p1,p2])
//    .then(result=>console.log(result))
//    .catch(err => console.log("Error", err.message));

// // const  p = new Promise((resolve, reject)=>{
   
// //     let p = 2;

// //     if(p===1){
// //        resolve("Resolve");    //Resolve and fullfill   
// //     }
    
// //     if(p===2){
// //         reject(new Error("Error."));  //Pending => Rejected        
// //     }
  
// //   });
// // p
// //  .then(result => console.log("This is result :",result))
// //  .catch(err => console.log(err.message));
  
// function getUser(id){
   
//     return new Promise((resolve, reject)=>{
//            setTimeout(()=>{
//               console.log("Rading User From Data");
//               resolve({id: id, Username:'Tariq'})
  
//            },2000)
//     });
// }

// function getRepositories(repo){
//     return new Promise((resolve, reject)=>{
//            setTimeout(()=>{
//               console.log("Rading Repositories");
//               resolve(['repo1','repo2', 'repo3'])
//            },2000)
//     });
// }

// function getRepositories(repo){
//     return new Promise((resolve, reject)=>{
//            setTimeout(()=>{
//               console.log("Rading Repositories");
//               resolve(['repo1','repo2', 'repo3'])
//            },2000)
//     });
// }

// getUser(1)
// .then(user => getRepositories(user.Username))
// .catch(err => console.log(err.message))