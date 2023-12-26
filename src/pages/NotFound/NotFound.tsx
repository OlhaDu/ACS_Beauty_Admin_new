import error from '../../images/404.jpg';
import style from '../NotFound/NotFound.module.scss';

function PageNotFound() {
	return (
		<div className={style.notFoundWrapper}>
			<div className={style.notFound}>
				<img width="100%" src={error} alt="404" loading="lazy" />
				<span className={style.textError}>
					Щось пішло не так...
					<br />
					Ви ввели неправильну адресу, або ця сторінка на сайті більше не доступна.
				</span>
			</div>
		</div>
	);
}

export default PageNotFound;