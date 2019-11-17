import { createMuiTheme, MuiThemeProvider, Button } from "@material-ui/core";

const theme = createMuiTheme({
	overrides: {
		MuiInputBase: {
			input: {
				width: "100%",
				fontSize: "120%",
				height: "35.1875px",
				color: "black"
			}
		},
		MuiSvgIcon: {
			root: {
				fontSize: "23.5px"
			}
		},
		MuiFab: {
			root: {
				backgroundColor: "#F1F3F4",
				color: "rgba(74, 71, 71, 0.87)",
				boxShadow: 0,
				width: "36px",
				height: 0,
				marginLeft: "9px",
				marginBottom: "9px",
				marginRight: "9px",
				marginTop: "1%"
			}
		},
		MuiAvatar: {
			root: {
				fontSize: "14.25px",
				width: "50px",
				height: "50px"
			},
			colorDefault: {
				backgroundColor: "orchid",
				marginTop: "6%",
				marginRight: "2%"
			}
		},
		MuiPaper: {
			elevation4: {
				boxShadow: "none",
				borderBottom: "groove",
				borderBottomWidth: "thin"
			}
		},
		MuiDrawer: {
			paperAnchorDockedLeft: {
				marginTop: "65px",
				borderRight: "none"
			}
		},
		MuiAppBar: {
			root: {
				borderBottom: "none"
			}
		},
		MuiButton: {
			label: {
				fontSize: "96%",
				textTransform: "capitalize"
			}
		}
	}
});
