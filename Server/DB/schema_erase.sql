set search_path to dev;

-- query for cleaning the scema in case 
do $$
	
	declare table_name text;
	begin 
		for table_name in (select tablename from pg_tables where schemaname = 'dev')
		loop 
			execute 'drop table if exists dev.' || quote_ident(table_name) || ' cascade';
		end loop;
end $$;
