import { Col, Row } from 'antd';
import { SignInForm } from '../../features';

import "./SignIn.css"

const SignIn = () => {
    return (
        <div className="sign-in-container">
            <Row justify="center">
                <Col className="form-container" span={12}>
                    <SignInForm />
                </Col>
                <Col className="image-container" span={12}>
                    <div className="text-container">
                        <h1 className="heading"> ETTI Internships.</h1>
                        <h3 className="subheading"> Connecting students with their future...</h3>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default SignIn;