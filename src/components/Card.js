import 'bootstrap/dist/css/bootstrap.min.css'
import './Card.css'

export const Card = ({id, image, name, description}) => {
    return (
        <div id={id} className="card">
            <img src={image} className="card-img-top" alt={name}/>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">Description: {description}</p>
            </div>
        </div>
        
    )
}