import { Link } from 'react-router-dom'
import style from '../component css/Home.module.css'
const HomePageControll = () => {
  return (
    <div className={style.pageSelector}>
      <div className={`container text-center`}>
        <div className="row">
          <div className="col">
            <Link to='/' type="button" className={`${style.Link} btn btn-primary`}>Your BMI </Link>
          </div>
          <div className="col">
            <Link to='/' type="button" className={`${style.Link} btn btn-success`}>You BMI is Perfact</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomePageControll