import { Carousel } from 'antd';
import  '../styles/accountCarousel.css';
import { Link } from "react-router-dom"

function AccountCarousel({course}) {
    // const courseRemain = course.map(function(course) {
    //     return (
    //         <div>course.courseTitle</div>
    //     )
    // }
    
    // )
    return (
        <div style={{ marginTop: "2rem", width: "1000px", height:"200px", backgroundColor:"#b3d0ff", borderRadius:"10px"}}>
            <Carousel dotPosition='top'>
                <div>
                    <div className='grid-cont'>
                        {/* <CarouselList course={course}/> */}
                        <Link style={{ textDecoration: 'none', color: "black" }} to={`/review/CZ3002`} >
                            <div>CZ3002 Advanced Software Engineering</div>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: "black" }} to={`/review/CZ4062`} >
                            <div>CZ4062 Computer Security</div>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: "black" }} to={`/review/CZ3004`} >
                            <div>CZ3004 Multidisciplinary Design Project</div>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: "black" }} to={`/review/CZ3005`} >
                            <div>CZ3005 Artificial Intelligence</div>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: "black" }} to={`/review/CZ4031`} >
                            <div>CZ4031 Database System Principles</div>
                        </Link>
                        <div>CZ3006 Net Centric Computing</div>
                        <div>CZ4153 Blockchain</div>
                        <div>CZ4042 Neural Networks</div>
                        <div>CZ4010 Applied Cryptography</div>
                    </div>
                </div>
                <div>
                    <div className='grid-cont'>
                        <div>CZ4041 Machine Learning</div>
                    </div>
                </div>
                <div>
                    <div className='grid-cont'>Slide 3</div>
                </div>
                <div>
                    <div className='grid-cont'>Slide 4</div>
                </div>
            </Carousel>
        </div>
    );
}

export default AccountCarousel;