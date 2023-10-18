import CardShop from "../CardShop/CardShop"

const CardsShop = ({compras}) => {
  console.log('COMPRAS CARD', compras[0]);
  return (
    <div>

        {compras
        ? (compras.map(compra => {
            return (
                <CardShop
                    key={compra.id}
                    id={compra.id}
                    idUser={compra.idUser}
                    date={compra.date.slice(0,10)}
                    total={compra.total}
                />
            )
        }))
        : <h2>Sin compras</h2>
        }
      
    </div>
  )
}

export default CardsShop
