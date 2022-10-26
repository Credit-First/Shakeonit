
import { Box, Avatar, Badge } from "@mui/material";

const Contact = (props) => {
    const { data, selected } = props;

    return <Box className={`py-4 message-contact flex ${selected ? "message-contact-selected" : ""}`} onClick={() => props.openaddress(data.address)}>
        <Avatar className="mx-3">
            {"J"}
        </Avatar>
        <Box style={{width: 140}}>
            <p style={{fontSize: 12}}>
                {data.address}
            </p>
            <div className="pt-3 flex">
                <p style={{fontSize: 10, color: 'gray', marginRight: 'auto', marginTop: '-0.4rem'}}>
                    {data.lastmsg.length > 24 ? data.lastmsg.substring(0, 21) + "..." : data.lastmsg}
                </p>
                <Badge badgeContent={data.unread} color="primary"></Badge>
            </div>
        </Box>
    </Box>;
}

export default Contact;