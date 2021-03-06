<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::resource('drill', 'DrillController');
Route::resource('position', 'PositionController');
Route::resource('session', 'SessionController');

Route::get('/', function()
{
	return View::make('home', array('positions' => Position::all()->toArray() ));
});

Route::get('/ovning/{id}', function($id) {
	return View::make('single', array('single_drill_id' => $id));
});