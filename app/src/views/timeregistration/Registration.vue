<template>
<div>
        <div class="container-fluid">
            <div class="row m-auto">
                <div class="col-lg-12 timereg">
                    <form id="data-form">
                        <h1>Prolike work hours</h1>
                        <label>Date</label>
                        <div id="sandbox-container">
                            <div class="input-daterange input-group" id="datepicker">
                                <input type="text" class="input-sm form-control" name="date" placeholder="DD/MM/YYYY"
                                    id="date" style="text-align:left;">
                            </div>
                        </div>
                        <label>Start time</label>
                        <div class="input-group clockpicker">
                            <input type="text" class="form-control" id="start" value="09:00">
                        </div>
                        <label>End time</label>
                        <div class="input-group clockpicker">
                            <input type="text" class="form-control" id="end" value="16:00">
                        </div>
                        <label>Work Hours</label>
                        <input type="text" class="form-control" id="hours" value="7">
                        <label>Category</label>
                        <select id="category">
                            <option value="" disabled selected>Select category</option>
                        </select>
                        <label>Project</label>
                        <select id="project">
                            <option value="" disabled selected>Select project</option>
                        </select>
                        <label>Comment</label>
                        <input class="textarea" type="text" id="comment" placeholder="Work description" />
                        <button id="saveMe" type="button" class="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
</div>
</template>