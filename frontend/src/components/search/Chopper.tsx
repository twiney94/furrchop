interface ChopperInfos {
	id: number;
	image: string;
	title: string;
	address: string;
	rating: number;
	reviews: number;
	availabilities: Array<{
		date: string;
		availabilities: Array<{
			start: string;
			end: string;
		}>;
	}>;
}

const ChopperCard = ({ infos }: { infos: ChopperInfos }) => {
	return (
		<div className="card bg-yellow-300 grow">
			<div className="card-image">
				<figure className="image is-4by3">
					<img src={infos.image} alt="Placeholder image" />
				</figure>
			</div>
			<div className="card-content">
				<div className="media">
					<div className="media-content">
						<p className="title is-6">{infos.title}</p>
						<p className="subtitle is-6">{infos.address}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChopperCard;
