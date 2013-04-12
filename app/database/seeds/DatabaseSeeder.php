<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
    public function run()
    {
        $this->call('PositionsTableSeeder');
    }

}

class PositionsTableSeeder extends Seeder {

    public function run() {
        DB::table('positions')->delete();

        Position::create(array(
							'fullname' => 'Offense',
							'label' => 'o'
        ));
        Position::create(array(
							'fullname' => 'Defense',
							'label' => 'd',
        ));
        Position::create(array(
							'fullname' => 'Special Teams',
							'label' => 'st',
        ));
        Position::create(array(
							'fullname' => 'Quarterback',
							'label' => 'qb',
        ));
        Position::create(array(
							'fullname' => 'Running Backs',
							'label' => 'rb',
        ));
        Position::create(array(
							'fullname' => 'Offensive Line',
							'label' => 'ol',
        ));
        Position::create(array(
							'fullname' => 'Wide Receivers',
							'label' => 'wr',
        ));
        Position::create(array(
							'fullname' => 'Tight Ends',
							'label' => 'te',
        ));
        Position::create(array(
							'fullname' => 'Defensive Line',
							'label' => 'dl',
        ));
        Position::create(array(
							'fullname' => 'Linebackers',
							'label' => 'lb',
        ));
        Position::create(array(
							'fullname' => 'Defensive Backs',
							'label' => 'db',
        ));
        Position::create(array(
							'fullname' => 'Kickers',
							'label' => 'k',
        ));
        Position::create(array(
							'fullname' => 'Fys',
							'label' => 'fys',
        ));

    }
}