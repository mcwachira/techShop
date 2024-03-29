import React , {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import {useNavigate}  from 'react-router-dom'
const Search = () => {


    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()

        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
            navigate(`/`)
        }


    }
  return (

    <form  onSubmit={handleSearch}>
          <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <FaSearch/>
          </button>
        </div>
      </div>
    </form>  
  )
}

export default Search