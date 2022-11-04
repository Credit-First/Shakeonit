import { Dialog } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Spinner from "../Spinner";
import { reduceAddress } from '../../utils/common';

function TransactionStatus({
    contractAddress,
    name,
    image,
    open: openModal,
    setOpen: setOpenModal,
    title,
    approveTitle,
    confirmTitle,
    approveLoading,
    confirmLoading,
    onRefresh
}) {
    const [approveCollapse, setApproveCollapse] = useState(true);
    const [confirmCollapse, setConfirmCollapse] = useState(false);
    const [counter, setCounter] = useState(10);
    const [isRefresh, setIsRefresh] = useState(false);

    const handleRefresh = () => {
        (approveLoading > 1 || confirmLoading > 1) && onRefresh()
    }

    useEffect(() => {
        let timer;
        if (openModal && (approveLoading === 3 || confirmLoading === 3)) {
            if (counter > 0) timer = setInterval(() => setCounter(counter - 1), 1000)
            setIsRefresh(true)
        }
        if (!openModal) {
            setIsRefresh(false)
            clearInterval(timer)
            setCounter(10)
        }
        return () => clearInterval(timer);
    }, [openModal, counter, approveLoading, confirmLoading]);

    return (
        <>
            <Dialog
                open={openModal}
                maxWidth="xs"
                fullWidth
                className="relative"
            >
                <div className="absolute" style={{ top: "10px", right: "15px" }}><CloseIcon className="text-slate-400" onClick={() => setOpenModal(false)} /></div>
                <div className="text-slate-800 p-5 pb-10">
                    <div className="flex items-center justify-center pb-5">
                        <p className="text-slate-800 font-medium text-xl uppercase">{title}</p>
                    </div>
                    <div className="flex items-center justify-center rounded-lg border border-slate-300 p-2">
                        <div className="flex items-center justify-center">
                            <img className='rounded-lg' src={image} alt="" style={{ width: "70px", height: "auto" }} />
                        </div>
                        <div className="h-full flex-1 flex items-center justify-between pl-2">
                            <div className="flex flex-col items-start justify-between gap-y-2">
                                <div className="font-bold text-xl">{name}</div>
                                <div className="text-gray-700 text-sm">{reduceAddress(contractAddress, 12, 10)}</div>
                            </div>
                        </div>
                        <div className="flex items-start justify-center">
                            {
                                isRefresh &&
                                <>
                                    {
                                        counter === 0 ?
                                            <div className='cursor-pointer rounded-full border border-red-600/50 font-bold text-sm px-3 py-1 text-red-600 hover:bg-red-600 hover:text-white' onClick={handleRefresh}>Retry</div>
                                            :
                                            <div className="text-red-600 text-sm font-bold">{counter} s</div>
                                    }
                                </>
                            }
                        </div>
                    </div>
                    {
                        approveTitle &&
                        <div className="w-full flex flex-col justify-center mt-5">
                            <div className="rounded-lg border border-slate-300">
                                <div className="cursor-pointer w-full h-[50px] flex items-center justify-between px-3 py-2"
                                    onClick={() => setApproveCollapse(!approveCollapse)}>
                                    <div className="flex items-center font-bold">
                                        <span>1. Approve</span>
                                    </div>
                                    <div className="flex items-center">
                                        {approveLoading === 1 && <Spinner />}
                                        {approveLoading === 2 &&
                                            <div className="flex items-center text-green-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="fill-green-700 mr-1" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" /> <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" /> </svg>
                                            </div>
                                        }
                                        {approveLoading === 3 &&
                                            <div className="flex items-center text-red-600">
                                                <svg width="24" height="24" viewBox="0 0 24 24" className='fill-red-600 mr-1' xmlns="http://www.w3.org/2000/svg"><path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm5.793-4.207a1 1 0 0 1 1.414 0L12 10.586l2.793-2.793a1 1 0 1 1 1.414 1.414L13.414 12l2.793 2.793a1 1 0 0 1-1.414 1.414L12 13.414l-2.793 2.793a1 1 0 0 1-1.414-1.414L10.586 12 7.793 9.207a1 1 0 0 1 0-1.414z" /></svg>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className={"flex flex-col items-center justify-center rounded-b-lg bg-slate-200/60 w-full text-sm text-left normal-case transition-all " + (approveCollapse ? "max-h-[2000px] opacity-100 p-2 border-t border-slate-300 " : "max-h-0 opacity-0")}>
                                    <div className="w-full pl-4">
                                        <span>Approve</span>
                                        <span className="font-bold px-2">{approveTitle}</span>
                                        <span>to Shakeonit</span>
                                    </div>
                                    <div className="w-full pl-4">
                                        <p>You can approve as many as you need.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        confirmTitle &&
                        <div className="w-full flex flex-col justify-center mt-5">
                            <div className="rounded-lg border border-slate-300">
                                <div className="cursor-pointer w-full h-[50px] flex items-center justify-between px-3 py-2"
                                    onClick={() => setConfirmCollapse(!confirmCollapse)}>
                                    <div className="flex items-center font-bold">
                                        <span>2. Confirm</span>
                                    </div>
                                    <div className="flex items-center">
                                        {confirmLoading === 1 && <Spinner />}
                                        {confirmLoading === 2 &&
                                            <div className="flex items-center text-green-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="fill-green-700 mr-1" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" /> <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" /> </svg>
                                            </div>
                                        }
                                        {confirmLoading === 3 &&
                                            <div className="flex items-center text-red-600">
                                                <svg width="24" height="24" viewBox="0 0 24 24" className='fill-red-600 mr-1' xmlns="http://www.w3.org/2000/svg"><path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm5.793-4.207a1 1 0 0 1 1.414 0L12 10.586l2.793-2.793a1 1 0 1 1 1.414 1.414L13.414 12l2.793 2.793a1 1 0 0 1-1.414 1.414L12 13.414l-2.793 2.793a1 1 0 0 1-1.414-1.414L10.586 12 7.793 9.207a1 1 0 0 1 0-1.414z" /></svg>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className={"flex items-center justify-center rounded-b-lg bg-slate-200/60 text-sm text-left normal-case transition-all " + (confirmCollapse ? "max-h-[2000px] opacity-100 p-2 border-t border-slate-300 " : "max-h-0 opacity-0")}>
                                    <div className="w-full pl-4">
                                        <span>{title}</span>
                                        <span className="font-bold px-2">{confirmTitle}</span>
                                        <span>of Shakeonit</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Dialog>
        </>
    );
}

export default TransactionStatus;