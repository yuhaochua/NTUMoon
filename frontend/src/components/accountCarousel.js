import { Carousel } from 'antd';
import  '../styles/accountCarousel.css';

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
                        <div>CZ3002 Advanced Software Engineering</div>
                        <div>CZ4062 Computer Security</div>
                        <div>CZ3004 Multidisciplinary Design Project</div>
                        <div>CZ3005 Artificial Intelligence</div>
                        <div>CZ4031 Database System Principles</div>
                        <div>CZ3006 Net Centric Computing</div>
                        <div>CZ4153 Blockchain</div>
                        <div>CZ4042 Neural Networks</div>
                        <div>CZ4010 Applied Cryptography</div>
                    </div>
                </div>
                <div>
                    <div className='grid-cont'>Slide 2</div>
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