import React, { useContext } from "react"
import MikePhoto from "../../img/m101.jpg"
import { AppContext } from "../layout"

export const ContactCard = () => {
    const { user , setUser } = useContext(AppContext)

    return (
        <li className="list-group-item">
			<div className="row w-100">
				<div className="col-12 col-sm-6 col-md-3 px-0">
					<img src={MikePhoto} alt="Mike Anamendolla" className="rounded-circle mx-auto d-block img-fluid" />
				</div>
				<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
					<div className=" float-right">
							<button className="btn">
								<i className="fas fa-pencil-alt mr-3" />
							</button>
						<button className="btn">
							<i className="fas fa-trash-alt" />
						</button>
					</div>
					<label className="name lead">Test Name</label>
					<br />
					<i className="fas fa-map-marker-alt text-muted mr-3" />
					<span className="text-muted">Test Name</span>
					<br />
					<span
						className="fa fa-phone fa-fw text-muted mr-3"
						data-toggle="tooltip"
						title=""
						data-original-title="(870) 288-4149"
					/>
					<span className="text-muted small">Test Phone</span>
					<br />
					<span
						className="fa fa-envelope fa-fw text-muted mr-3"
						data-toggle="tooltip"
						data-original-title=""
						title=""
					/>
					<span className="text-muted small text-truncate">Test Email</span>
				</div>
			</div>
		</li>
    )
}