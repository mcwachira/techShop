class APIFeatures  {
    constructor(query, queryStr){
        this.query = query
        this.queryStr = queryStr
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword, 
                $options:'i'
            }
        }: {}

        this.query = this.query.find({...keyword})

        return this
    }

    filter(){
        //make a copy of the query string

        const queryCopy = {...this.queryStr}
        
        //remove fields from the query

        const removedFields = ['keyword', 'limit', 'page']
        removedFields.forEach((el) => delete queryCopy[el])

        //Advanced filter fom price , ratings  e.t.c
        
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,  match =>`$${match}` )


        console.log(queryCopy)

        this.query = this.query.find(JSON.parse(queryStr))   
        

        return this
    
    
    }

    pagination(resultsPerPage) {
         const currentPage = Number(this.queryStr.page) ||1;
         const skip  = resultsPerPage  * (currentPage - 1)


        this.query = this.query.limit(resultsPerPage).skip(skip)
        

        return this

    }
}
module.exports = APIFeatures









  