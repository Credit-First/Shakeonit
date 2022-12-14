import { TypographySize40, TypographySize20 } from "../../components/Typography/TypographySize";
import React, { useEffect } from "react";

function Service() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    return (
        <div>
            <div className="privacy-bg">
                <TypographySize40 className="flex justify-center font-md-list pt-10 pb-4 lg:py-16">Terms Of Service</TypographySize40>
            </div>
            <div className="service-bg pb-20 lg:pb-28">
                <div className="mx-6 lg:mx-[22%] p-7 lg:p-12 rounded-[16px] lg:rounded-[24px] bg-white">
                    <TypographySize20 className="pb-3 lg:pb-6">
                        BY USING OUR SERVICE, YOU AGREE TO BE BOUND BY ALL OF THE TERMS OF SERVICE CONTAINED AND REFERENCED. IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT USE THIS SERVICE.
                    </TypographySize20>
                    <TypographySize20 className="pb-3 lg:pb-6">
                        DISCLAIMER
                    </TypographySize20>
                    <div className="text-content">
                        By using this service, you agree to do so at your own risk. You understand and agree that the service is provided on an “as is” and “as available” basis. Shakeonit expressly disclaims warranties or conditions of any kind, either express or implied.
                        Shakeonit (and its suppliers) at this time, makes no warranty or representation and disclaim all responsibility for whether the service: will meet your requirements; will be available on an uninterrupted, timely, secure, or error-free basis; or will be accurate, legal, safe, reliable, or complete.
                        While Shakeonit attempts to make your access to and use of the service safe, Shakeonit cannot and does not represent or warrant that the service or content linked to or associated with any NFT or any NFTs you interact with using our service or our service providers’ servers are free of viruses or other harmful components.
                        Shakeonit will not be liable for any loss of any kind from any action taken or taken in reliance on material or information, contained in the service. Shakeonit disclaims all other warranties or conditions, express or implied, including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, title, and non-infringement.
                        Shakeonit cannot guarantee the security of any data that you disclose online. No advice or information, whether oral or obtained from the Shakeonit parties or through the service, will create any warranty or representation not expressly made herein. You accept the inherent security risks of providing information and dealing online over the internet and will not hold Shakeonit responsible for any security breach.
                        Shakeonit will not be liable or responsible for any loss or use of NFTs, content, and/or content linked to or associated with NFTs, including but not limited to any losses, damages, or claims arising from: (a) user error, incorrectly constructed transactions, or mistyped addresses; (b) server failure or data loss; (c) unauthorized access or use; (d) any unauthorized third-party activities, including without limitation the use of viruses, phishing, brute-forcing or other means of attack against the service or NFTs.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Service;