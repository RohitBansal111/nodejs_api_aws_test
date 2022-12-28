const data = [
    {
        "name": "Afghanistan",
        "isoCode": "AF",
        "flag": "🇦🇫",
        "phonecode": "93",

  
    },
        {
            "name": "Afghanistan2",
            "isoCode": "AF",
            "flag": "🇦🇫",
            "phonecode": "932",

         
        }

    ]
  var requiredfield=['name','phonecode','flag']

  const final_data =  data.map(val=>{
    let obj={}
    requiredfield.map(field=>{
        obj[field]=val[field]

   })
return obj
  }) 

   console.log(final_data)

  
 