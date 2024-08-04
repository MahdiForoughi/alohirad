var mongo = require('mongo');

export function runSeed(db)
{

    console.log("running seed...");

    //categories
    db.createCollection("categories");
    db.collection("categories").insertMany([
        {
            name : "دسته بندی یک",
            code : "categor1"
        }
    ])
    //items
    db.createCollection("items");
    db.collection("items").insertMany([
        {
            title : "تیشرت طرح شماره یک",
            sku : "item1",
            tags : [
                "new",
                "popular",
                "choice"
            ],
            images:
            { 
                medium : "popular3.png",
            },
            price: 250,
            shortDescription : "این محصول صرفا جهت تست قرار گرفته است"
            
        }
    ]);
    //menus

    // db.createCollection("users");
    // db.collection("users").insertMany([
    //     {
    //         email : "foroughi.ali@gmail.com",
    //         name : "علی فروغی",
    //         password : "12345"
    //     }
    // ]);

    console.log("running seed is done");

}
