<template>
<div>
        <div class="container-fluid">
            <div class="row m-auto">
                <div class="col-lg-12 timereg">
                    <div class="timereg-title">
                        <h1>Time Registration</h1>
                        </div>
                    <form id="data-form">
                        <div class="row">

                            <div class="col-lg-4 specialized-box">
                        <label>Date</label>
                        <div id="sandbox-container">
                            <div class="input-daterange input-group" id="datepicker">
                                <input type="text" class="form-control input-sm" name="date" placeholder="DD/MM/YYYY"
                                    id="date" style="text-align:left;">
                            </div>
                        </div>
                        <label>Start time</label>
                        <div class="input-group clockpicker">
                            <input type="text" class="form-control" id="start" placeholder="09:00">
                        </div>
                        <label>End time</label>
                        <div class="input-group clockpicker">
                            <input type="text" class="form-control" id="end" placeholder="16:00">
                        </div>
                        </div>

                        <div class="col-lg-4 specialized-box">
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
                        </div>
                        <div class="col-lg-4 specialized-box">
                        <label>Comment</label>
                        <input class="textarea" type="text" id="comment" placeholder="Work description" />
                        <button id="saveMe" type="button" class="btn btn-primary">Save</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</div>
</template>

<style lang="scss" scoped>
    .timereg {
        background: #ffffff;
        padding: 0;
        padding-bottom: 100px;
        box-shadow: 0 0 10px solid #000000;
    }

    .timereg-title {
        background: #f0f3f5;
        color: #000000;
        padding: 5px;
        margin-bottom: 100px;

        h1 {
            font-size: 16px;
        }
    }

    .input-group, .form-control {
            width: 80px;
        }

    .specialized-box {
        display: flex;
        align-items: center;
        justify-content: center;
    }


</style>