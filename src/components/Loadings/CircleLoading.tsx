import style from "./CircleLoading.module.scss"

function CircleLoading() {
	return (
			<div className={style.ring}>Завантаження
				<span></span>
			</div>
	);
}

export default CircleLoading;