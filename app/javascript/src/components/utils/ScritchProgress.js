import React from 'react'
import Lottie from 'react-lottie'
import loaderJSON from '../../loaderJSON.json'

//TODO: make Progressbar instead of Spinner
const ScritchProgress = ({ size }) => {
    return (
        <Lottie
            options={{
                loop: true,
                autoplay: true,
                animationData: loaderJSON,
                rendererSettings: {
                    preserveAspectRatio: '',
                },
            }}
            height={size}
            width={size}
        />
    )
}

export default ScritchProgress
