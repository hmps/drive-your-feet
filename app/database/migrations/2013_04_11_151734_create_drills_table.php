<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrillsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('drills', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('position_id');
			$table->string('title');
			$table->text('description')->nullable();
			$table->string('video')->nullable();
			$table->string('tags')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('drills');
	}

}
