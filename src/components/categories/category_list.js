

function CategoryList(props){
    
	return(
		<div className="p-2 overflow">
			<table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th>Category Name</th>
                </tr>
              </thead>
              <tbody>
                  {
                      props.data.map((val,i) =>
                            <tr key={i}>
                              <th scope="row">{i+1}</th>
                              <td>{val.category_name}</td>
                            </tr>
                      )
                  }
                
              </tbody>
            </table>
		</div>
	)
}

export default CategoryList;