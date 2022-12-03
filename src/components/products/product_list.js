

function ProductList(props){
    
	return(
		<div className="p-2 overflow">
			<table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th>Product Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Description</th>
            <th>Category Name</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          {
            props.data.length > 0 ? props.data.map((val,i) =>
                  <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td><img src={val.product_image} alt={'image'+i} width='30' height="30"/></td>
                    <td>{val.product_name}</td>
                    <td>{val.product_description}</td>
                    <td>{val.category_name}</td>
                    <td>{val.product_price}</td>
                  </tr>
            ) : ''
          }
          
        </tbody>
      </table>
		</div>
	)
}

export default ProductList;