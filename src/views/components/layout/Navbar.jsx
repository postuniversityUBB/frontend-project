import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import {
	makeStyles,
	IconButton,
	AppBar,
	Toolbar,
	SwipeableDrawer,
	Button,
	Tooltip,
	Fade,
	Typography,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import ClearIcon from "@material-ui/icons/Clear"

import companyLogo from "../../../styles/images/logo2.png"

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	drawer: {
		width: 260,
		flexShrink: 2,
	},
	drawerPaper: {
		width: 260,
		backgroundColor: "#384A9C",
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	menuButtons: {
		width: 100,
		height: 40,
		fontWeight: "bold",
	},
	userTitle: {
		marginRight: "80px",
	},
}))

const Navbar = () => {
	const classes = useStyles()
	const [state, setState] = useState({
		left: false,
	})
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

	const toggleDrawer = (anchor, open) => event => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return
		}

		setState({ ...state, [anchor]: open })
	}

	const drawer = anchor => (
		<div
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<div className={classes.drawerHeader}>
				<IconButton id="buttonToCloseNavBar">
					<ClearIcon className="clearIcon" />
				</IconButton>
			</div>
			<div>
				<nav>
					<Link
						id="linkToProjectsList"
						className="navigationLink"
						to="/project/list"
					>
						PROJECTS
					</Link>
					<Link id="linkToUsersList" className="navigationLink" to="/user/list">
						USERS
					</Link>
					<Link
						id="linkStatistics"
						className="navigationLink"
						to="/statistics/chart"
					>
						STATISTICS
					</Link>
				</nav>
			</div>
		</div>
	)

	return (
		<div className={classes.root}>
			{["left"].map(anchor => (
				<React.Fragment key={anchor}>
					<AppBar position="fixed">
						<Toolbar className="toolBar">
							{user ? (
								<>
									<IconButton
										edge="start"
										id="buttonToOpenNavBar"
										color="primary"
										aria-label="open drawer"
										onClick={toggleDrawer(anchor, true)}
									>
										<MenuIcon />
									</IconButton>
									<Link
										style={{ flexGrow: 1 }}
										id="linkToHome"
										to="/home/index"
									>
										<Tooltip
											arrow
											TransitionComponent={Fade}
											TransitionProps={{ timeout: 600 }}
											title="Home page"
											placement="right"
										>
											<img
												src={companyLogo}
												alt="Company Logo"
												className="companyLogo"
											/>
										</Tooltip>
									</Link>
									<Typography
										color="primary"
										variant="h5"
										className={classes.userTitle}
									>
										Hi, {user.firstName}!
									</Typography>
									<Button component={Link} to={'/contact'}
										size="large"
										color="primary"
										className={classes.menuButtons}
									>
										Contact
									</Button>
									<Button component={Link} to={'/about'}
										size="large"
										color="primary"
										className={classes.menuButtons}
									>
										About
									</Button>
									<Button
										size="large"
										color="primary"
										href="/log-out"
										className={classes.menuButtons}
									>
										Logout
									</Button>
								</>
							) : (
								<>
									<Link
										style={{ flexGrow: 1 }}
										id="linkToHome"
										to="/home/index"
									>
										<Tooltip
											arrow
											TransitionComponent={Fade}
											TransitionProps={{ timeout: 600 }}
											title="Home page"
											placement="right"
										>
											<img
												src={companyLogo}
												alt="Company Logo"
												className="companyLogo"
											/>
										</Tooltip>
									</Link>

									<Button component={Link} to={'/contact'}
										size="large"
										color="primary"
										className={classes.menuButtons}
									>
										Contact
									</Button>
									<Button component={Link} to={'/about'}
										size="large"
										color="primary"
										className={classes.menuButtons}
									>
										About
									</Button>
									<Button component={Link} to={'/login'}
										size="large"
										color="primary"
										className={classes.menuButtons}
									>
										Login
									</Button>
									<Button component={Link} to={'/register'}
										size="large"
										color="primary"
										className={classes.menuButtons}
									>
										Register
									</Button>
								</>
							)}
						</Toolbar>
					</AppBar>
					<SwipeableDrawer
						className={classes.drawer}
						classes={{ paper: classes.drawerPaper }}
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
						onOpen={toggleDrawer(anchor, true)}
					>
						{drawer(anchor)}
					</SwipeableDrawer>
				</React.Fragment>
			))}
		</div>
	)
}

export default Navbar;
