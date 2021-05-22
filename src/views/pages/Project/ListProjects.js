import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable from 'material-table';
import { Divider, Grid, Fab, withStyles, makeStyles, Tooltip, Fade } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';

import LoadingSpinner from '../../components/layout/LoadingSpinner';

const tableIcons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef(() => ""),
    Search: forwardRef((props, ref) => <Search id="searchClients" {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

const StyledDivider = withStyles(() => ({
    root: {
        backgroundColor: '#EBF0F9',
        height: 3,
    }
}))(Divider);

const tableStyles = makeStyles({
    root: {
      minWidth: 300,
    },
    name: {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        width: '10rem'
    },
});

function ListProjects() {
    const baseUrl = 'https://ebs-software-v1.herokuapp.com';
    const root = '/api';

    const table = tableStyles();

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            axios.get(baseUrl + root + "/projects")
            .then(response => {
                setData(response.data);

                setIsLoading(true);
            })
            .catch(error => {
                console.log(error);
            });
        };
        fetchData();
    }, []);

    if (!isLoading) {
        return (
            <div id="loadingSpinnerForListProjects">
                <LoadingSpinner />
            </div>
        );
    } else {
        return (
            <div className="listEntities">
                <h3 id="headerListOfProjects" className="header">All Projects</h3>

                <div className="newEntity">
                    <Grid container spacing={1}>
                        <Grid container item xs={12} justify="flex-end">
                            <Tooltip title="Create new project" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} placement="left" aria-label="create new project">
                                <Fab id="buttonToCreateProject" className="inactive-button" aria-label="add new project" href="#createNewProject">
                                    <AddIcon/>
                                </Fab>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </div>

                <StyledDivider />
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        {
                            title: 'Project Name',
                            field: 'title',
                            render: rowData => (
                                <div className={table.name}>
                                    {rowData.title}
                                </div>
                            ),
                            searchable: true,
                            sortable: true,
                            defaultSort: 'asc',
                            customSort: (a,b) => a.title.localeCompare(b.title)
                        },
                        {
                            title: 'Added By',
                            field: 'addedByUserCode',
                            render: rowData => (
                                <div className={table.name}>
                                    {rowData.addedByUserCode}
                                </div>
                            ),
                            searchable: true,
                            sortable: true
                        },
                        {
                            title: 'Project Status',
                            field: 'projectStatus',
                            render: rowData => (
                                rowData.projectStatus
                            ),
                            searchable: true,
                            sortable: true
                        },
                        {
                            title: 'Description',
                            field: 'description',
                            render: rowData => (
                                <div className={table.name}>                                
                                    {rowData.description}
                                </div>
                            ),
                            searchable: true,
                            sortable: true
                        },
                        {
                            title: 'Date Added',
                            field: 'dateAdded',
                            render: rowData => (
                                formattedDate(rowData.dateAdded)
                            ),
                            searchable: true,
                            sortable: true,
                        },
                        {
                            title: 'Deadline',
                            field: 'deadline',
                            render: rowData => (
                                formattedDate(rowData.deadline)
                            ),
                            searchable: true,
                            sortable: true,
                        }
                    ]}
                    data={data}
                    options={{
                        search: true,
                        sorting: true,
                        rowStyle: row => {
                            if (!(row.tableData.id % 2)) {
                                return {backgroundColor: '#EBF0F9', fontSize: 14}
                            }
                            return {fontSize: 14}
                        },
                        headerStyle: {
                            fontWeight: 'bold',
                            fontSize: 16,
                        },
                        emptyRowsWhenPaging: false,
                        draggable: false,
                        thirdSortClick: false,
                        showTitle: false,
                        initialPage: 0,
                        paging: true,
                        pageSize: 5,
                        pageSizeOptions: [5, 10, 25, { value: data.length, label: 'All' }],
                        paginationType: "normal",
                        padding: "default"
                    }}
                    localization={{
                        body: {
                            emptyDataSourceMessage: 'No project found.'
                        },
                        toolbar: {
                            searchPlaceholder: "Search"
                        },
                        pagination: {
                            labelRowsSelect: "projects per page",
                            firstAriaLabel: "paginationFirstPage",
                            previousAriaLabel: "paginationPreviousPage",
                            nextAriaLabel: "paginationNextPage",
                            lastAriaLabel: "paginationLastPage"
                        }
                    }}
                />
            </div>
        );
    };
};

function formattedDate(date) {
    if (date === null){
        return "N/A";
    }

    var sliceDate = date.slice(0, 10);
    return sliceDate.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);
};

export default ListProjects
