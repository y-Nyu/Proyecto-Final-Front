import CardShop from "../CardShop/CardShop"

const CardsShop = ({compras}) => {

  
  return (
    <div>
      {console.log(compras.length)}
        {compras
        ? (compras.map(compra => {
            return (
                <CardShop
                    key={compra.id}
                    id={compra.id}
                    name={compra.details[0].name}
                    date={compra.createdAt.slice(0,10)}
                    quantity={compra.details[0].quantity}
                    image={compra.details[0].image}
                    total={compra.details[0].total}
                />
            )
        }))
        : <h2>Sin compras</h2>
        }
      
    </div>
  )
}

export default CardsShop
