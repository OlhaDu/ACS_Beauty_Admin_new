import error from '../../images/404.jpg';
import '../NotFound/NotFound.module.scss';

function PageNotFound() {
	return (
		<div className="notFoundWrapper">
			<div className="notFound">
				<img width="100%" src={error} alt="404" loading="lazy" />
				<span className="textError">
					Ви ввели неправильну адресу, або ця сторінка на сайті більше не доступна.
				</span>
			</div>
		</div>
	);
}

export default PageNotFound;