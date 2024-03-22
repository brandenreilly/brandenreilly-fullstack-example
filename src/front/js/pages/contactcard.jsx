import React, { useContext } from "react"
import MikePhoto from "../../img/m101.jpg"
import { AppContext } from "../layout"
import { Link } from "react-router-dom"

export const ContactCard = (props) => {
    const { user , setUser , contacts , setContacts , setModalId } = useContext(AppContext)

    return (
        <div style={{marginTop: "5px"}}>	
			<li className="list-group-item">
				<div className="row w-100">
					<div className="col-12 col-sm-6 col-md-3 px-0">
						<img src={MikePhoto} style={{marginTop: "17px"}} alt="Mike Anamendolla" className="rounded-circle mx-auto d-block img-fluid" />
					</div>
					<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
						<div className=" float-right">
							<Link to={`/editcontact/${props.index}`} state={{contactID: props.contact.id}} >
								<button className="btn">
									<i className="fas fa-pencil-alt mr-3" />
								</button>
							</Link>
							<button className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{setModalId(props.contact.id)}} >
								<i className="fas fa-trash-alt" />
							</button>
						</div>
						<label className="name lead">{props.contact.full_name}</label>
						<br />
						<i className="fas fa-map-marker-alt text-muted mr-3" />
						<span className="text-muted">{props.contact.address}</span>
						<br />
						<span
							className="fa fa-phone fa-fw text-muted mr-3"
							data-toggle="tooltip"
							title=""
							data-original-title="(870) 288-4149"
						/>
						<span className="text-muted small">{props.contact.phone}</span>
						<br />
						<span
							className="fa fa-envelope fa-fw text-muted mr-3"
							data-toggle="tooltip"
							data-original-title=""
							title=""
						/>
						<span className="text-muted small text-truncate">{props.contact.email}</span>
						<br />
						<span
							className="fa fa-user fa-fw text-muted mr-3"
							data-toggle="tooltip"
							data-original-title=""
							title=""
						/>
						<span className="text-muted small text-truncate">{props.contact.relation}</span>
					</div>
				</div>
			</li>
		</div>
    )
}