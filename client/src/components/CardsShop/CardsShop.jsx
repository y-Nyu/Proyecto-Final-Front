import CardShop from "../CardShop/CardShop"

const CardsShop = ({compras}) => {
  // console.log(compras);
  return (
    <div>

        {compras
        ? (compras.map(compra => {
            return (
                <CardShop
                    key={compra.detail.idsale}
                    id={compra.detail.idproduct}
                    name={compra.detail.name}
                    date={compra.createdAt.slice(0,10)}
                    quantity={compra.detail.quantity}
                    image={compra.detail.image}
                    total={compra.detail.total}
                />
            )
        }))
        : <h2>Sin compras</h2>
        }
      
    </div>
  )
}

export default CardsShop
