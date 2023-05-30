/* Author: Ruchika . */

import React, { useState, useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { IconButton, Badge } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import { Popper, Box, List, Avatar, ListItemText, ListItemAvatar, ListItem } from '@mui/material';
import ApiHandler from '../api-handler';


const useStyles = makeStyles((theme) => ({
    notificationsButton: {
        marginRight: theme.spacing(2),
    },
}));

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = !!anchorEl;

    useEffect(() => {
        // fetch all notifications on component mount
        ApiHandler.listNotifications(localStorage.getItem("email"))
            .then((response) => {
                setNotifications(response.data.data);
                setUnreadCount(response.data.data.filter(n => !n.read).length);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleNotificationClick = (event) => {
        // mark all notifications as read on click
        ApiHandler.listNotifications(localStorage.getItem("email"))
            .then((response) => {
                setNotifications(response.data.data.map(n => ({ ...n, read: true })));
                setUnreadCount(notifications.length);
            })
            .catch((error) => {
                console.error(error);
            });
        setAnchorEl(anchorEl ? null : event.currentTarget);

    };

    const handleDeletion = (notificationId, index) => {
        setUnreadCount(unreadCount-1);
        setNotifications(notifications.splice(index, 1));
        ApiHandler.deleteNotification(notificationId);
    }

    return (
        <div>
            <IconButton
                aria-label={`${unreadCount} unread notifications`}
                color={unreadCount > 0 ? "primary" : "inherit"}
                onClick={handleNotificationClick}
                className={classes.notificationsButton}
            >
                <Badge badgeContent={unreadCount} color="secondary">
                    <NotificationsActiveIcon />
                </Badge>
            </IconButton>
            <Popper open={open} anchorEl={anchorEl} style={{ zIndex: 10000 }}>
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                    {unreadCount === 0 ? "No notifications at the moment." : <List>
                        {notifications.map((data, index) => {
                            return <ListItem id={index}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => { handleDeletion(data._id, index) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        {data.notificationType === "LIKE" ? <FavoriteOutlinedIcon color='primary' /> : <ChatBubbleOutlinedIcon color='primary' />}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={data.notificatonMessage}
                                    secondary={null}
                                />
                            </ListItem>
                        })}
                    </List>}

                </Box>
            </Popper>
        </div>
    );
};

export default Notification;
