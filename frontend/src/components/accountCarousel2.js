import { Carousel } from 'antd';
import  '../styles/accountCarousel.css';
import { Link } from "react-router-dom"

function AccountCarousel2({course}) {
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
                        <div>SS5104 Basketball</div>
                        <div>BU5401 Management Decision Tools</div>
                        <div>AAA18E Drawing</div>
                        <div>CS5060 Introduction To Advertising</div>
                        <div>EE8084 Cybersecurity</div>
                        <div>SS5101 Badminton</div>
                        <div>SS5106 Netball</div>
                        <div>AAA28R Ceramics I</div>
                        <div>CS2044 Photojournalism</div>
                    </div>
                </div>
                <div>
                    <div className='grid-cont'>
                        <div>AAA18D Life Drawing</div>
                        <div>AAA18E Drawing</div>
                        <div>AAA18H Painting with Oil and Acrylic</div>
                        <div>MH1100 Calculus I</div>
                        <div>MH3101 Complex Analysis</div>
                        <div>MH3510 Regression Analysis</div>
                        <div>HL2002 Renaissance Literature</div>
                        <div>HL2004 Sensibility and Romanticism</div>
                        <div>HL2043 Fantasy Literature</div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
}

export default AccountCarousel2;