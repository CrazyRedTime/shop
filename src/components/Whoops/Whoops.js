import { Link } from "react-router-dom"

const Whoops = () => {
  return (
    <div>
      <div>Упс, такой страницы не существует</div>
      <Link to={'/'}>На главную</Link>
    </div>
  )
};

export default Whoops;