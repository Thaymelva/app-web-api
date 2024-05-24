import { Outlet, Link } from 'react-router-dom';
import Container from './Container';
import Styles from './NavBar.module.css'; 

function Navbar (){

    return(
        <>
            <Container>

                <ul className={Styles.list}>

                    <li className={Styles.item}>
                        <Link to='/'>Home</Link>
                    </li>

                    <li className={Styles.item}>
                        <Link to='/livros'>Livros</Link>

                    </li>

                    <li className={Styles.item}>
                        <Link to='/novolivro'>Cadastrar Livro</Link>

                    </li>

                </ul>

            </Container>
            
            <Outlet/>
            
        </>
    )
}

export default Navbar;